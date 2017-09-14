'''import http.server'''
import http.server
import socketserver
import sys
import threading

class Handler(http.server.SimpleHTTPRequestHandler):
    ''' Wrapper for http server handler '''
    def log_message(self, _format, *args):
        return

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
        httpd.serve_forever()


if __name__ == "__main__":
    main()
