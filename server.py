#!/usr/bin/env python

import os, sys, io
import http.server, socketserver
import ssl

class Handler(http.server.SimpleHTTPRequestHandler):
  def do_GET(self):
    http.server.SimpleHTTPRequestHandler.do_GET(self);

  def do_POST(self):
    print('TODO do_POST with self={}'.format(self))


def main():
  if not os.path.exists('scratch'):
    os.makedirs('scratch')

  ssl_key_path = os.path.abspath( os.path.join('ssl', 'key.pem') )
  ssl_cert_path = os.path.abspath( os.path.join('ssl', 'cert.pem') )


  os.chdir('www')
  httpd = socketserver.TCPServer(('', 4443), Handler)
  httpd.socket = ssl.wrap_socket(httpd.socket,
    keyfile=ssl_key_path,
    certfile=ssl_cert_path,
    server_side=True
  )
  print('Listening on https://[::]:4443')
  try:
    httpd.serve_forever()
  except KeyboardInterrupt:
    pass
  httpd.server_close()



if __name__ == '__main__':
  os.chdir( os.path.dirname(os.path.abspath(__file__)) )
  main()
