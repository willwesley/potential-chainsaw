const { CONNECTING, OPEN } = require('ws');
const { getOn } = require('../test_helpers');
const chatserver = require('./chatserver');

describe('chatserver', function() {
  let fakeWss, fakeHeartBeat, fakeRegister;

  beforeEach(function() {
    // suppress console.log output
    console.log = () => {}

    fakeWss = {
      on: jest.fn(),
      clients: [],
    };
    fakeHeartBeat = jest.fn();
    fakeRegister = jest.fn();
    fakeHeartBeat.mockReturnValue(fakeRegister);

    chatserver(fakeWss, fakeHeartBeat);
  });

  it('connects heartbeat to websocket server', function() {
    expect(fakeHeartBeat).toHaveBeenCalledWith(fakeWss);
  });

  it('registers a connection handler', function() {
    expect(fakeWss.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  describe('connection handler', function() {
    let fakeWs, fakeReq;
    let connectionHandler;
    beforeEach(function() {
      connectionHandler = getOn(fakeWss, 'connection');
      fakeWs = {
        on: jest.fn()
      }
      fakeReq = {
        socket: {
          remoteAddress: 'France'
        }
      }
    });

    it('registers a heartbeat for a new client', function() {

      connectionHandler(fakeWs, fakeReq);

      expect(fakeRegister).toHaveBeenCalledWith(fakeWs)
    });

    it('registers message and close handlers for a new client', function() {

      connectionHandler(fakeWs, fakeReq);

      expect(fakeWs.on).toHaveBeenCalledWith('message', expect.any(Function));
      expect(fakeWs.on).toHaveBeenCalledWith('close', expect.any(Function));
    });

    it('announces a new client to everyone except unready ones', function() {
      fakeWss.clients = [
        { readyState: OPEN, send: jest.fn() },
        { readyState: CONNECTING, send: jest.fn() },
        { readyState: OPEN, send: jest.fn() },
      ];

      connectionHandler(fakeWs, fakeReq);

      expect(fakeWss.clients[0].send).toHaveBeenCalledWith(
        '{"data":"Welcome France","who":"SERVER"}',
        {"binary": false}
      );
      expect(fakeWss.clients[1].send).not.toHaveBeenCalled();
      expect(fakeWss.clients[2].send).toHaveBeenCalledWith(
        '{"data":"Welcome France","who":"SERVER"}',
        {"binary": false}
      );
    });

    it('relays messages', function() {
      connectionHandler(fakeWs, fakeReq);
      fakeWss.clients = [
        { readyState: OPEN, send: jest.fn() },
      ];
      const onMessage = getOn(fakeWs, 'message');

      onMessage('Howdy everyone!');

      expect(fakeWss.clients[0].send).toHaveBeenCalledWith(
        '{"data":"Howdy everyone!","who":"France"}',
        {"binary": false}
      )
    });

    it('announces leaves', function() {
      connectionHandler(fakeWs, fakeReq);
      fakeWss.clients = [
        { readyState: OPEN, send: jest.fn() },
      ];
      const onClose = getOn(fakeWs, 'close');

      onClose();

      expect(fakeWss.clients[0].send).toHaveBeenCalledWith(
        '{"data":"Bye France","who":"SERVER"}',
        {"binary": false}
      )
    });
  });
});
