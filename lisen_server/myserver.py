from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from pathlib import Path
import pyscreenshot as ImageGrab


SAVE_DIR = Path().home().joinpath("Pictures/")
if not Path(SAVE_DIR).exists():
    print(SAVE_DIR)
    raise IOError(f"{SAVE_DIR}.No such directory.")
SAVE_DIR = Path(SAVE_DIR).joinpath("d_anime_screenshot/")
if not Path(SAVE_DIR).exists():
    SAVE_DIR.mkdir()


class HelloHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write("Hello, HTTP!\n".encode())

    def do_POST(self):
        self.send_response(200, "ok")
        print("call POST")
        print(self.headers)
        content_len = int(self.headers.get("content-length"))
        print(content_len)
        if content_len is not None:
            if not content_len:
                print("message length is 0")
                return
            tmp = self.rfile.read(content_len).decode("utf-8")
            body = json.loads(tmp)
            print(body)
            save_screenshot(body)

        # print(self.rfile)

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        print("call option")
        print(self.headers)

        self.end_headers()


def save_screenshot(json_body):
    title = json_body["title"]
    save_img_dir = Path(SAVE_DIR).joinpath(title)
    if not save_img_dir.exists():
        save_img_dir.mkdir()
    file_name = json_body["epsodeNumber"] + current_sec_to_save_name(json_body["time"])
    save_name = str(save_img_dir.joinpath(file_name))
    img = ImageGrab.grab()
    img.save(save_name)


def current_sec_to_save_name(sec_time: str):
    float_time = int(float(sec_time))
    minutes, second = divmod(int(float(sec_time)), 60)
    if minutes // 60 > 0:
        hour, minutes = divmod(minutes, 60)
        return f"{hour}-{minutes}-{second}({float_time}).png"
    else:
        return f"{minutes}-{second}({float_time}).png"


if __name__ == "__main__":
    server_address = ("", 2525)
    httpd = HTTPServer(server_address, HelloHandler)
    httpd.serve_forever()
