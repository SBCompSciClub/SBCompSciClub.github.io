'''import http.server'''
import http.server
import socketserver
import sys
import threading
import os
import urllib

class Handler(http.server.SimpleHTTPRequestHandler):
    ''' Wrapper for http server handler '''
    def log_message(self, _format, *args):
        return 
    def do_GET(self):
        urlparts = urllib.parse.urlparse(self.path)
        request_file_path = urlparts.path.strip('/')
        if not os.path.exists(request_file_path):
            self.path = '/'
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def main():
    ''' Program Entry Point '''
    _host = sys.argv[1]
    _port = int(sys.argv[2])
    server_thread = threading.Thread(target=start_server, args=(_host, _port))
    server_thread.daemon = True
    server_thread.start()
    while True:
        result = input("")
        if result:
            if "exit" in result:
                sys.exit(1)


def start_server(_host, _port):
    ''' Server Thread '''
    handler = Handler
    with socketserver.TCPServer((_host, _port), handler) as httpd:
        print("Starting server:")
        print("    host: " + sys.argv[1])
        print("    port: " + sys.argv[2])
        httpd.error_message_format = '';
        httpd.serve_forever()


if __name__ == "__main__":
    main()
