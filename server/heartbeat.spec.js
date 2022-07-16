jest.useFakeTimers();
const HeartBeat = require('./heartbeat');

describe('HeartBeat', function() {
  let fakeWebSocketServer, fakeWebSocket;
  let registerHeartbeat;

  beforeEach(function() {
    fakeWebSocket = {
      on: jest.fn(),
      ping: jest.fn(),
      terminate: jest.fn(),
    }
    fakeWebSocketServer = {
      on: jest.fn(),
      clients: [
        fakeWebSocket
      ],
    };
    registerHeartbeat = HeartBeat(fakeWebSocketServer);
    registerHeartbeat(fakeWebSocket);
  });

  it('returns a registration function that configured a pong handler', function() {
    expect(fakeWebSocket.on).toHaveBeenCalledWith('pong', expect.any(Function));
    expect(fakeWebSocket.ping).not.toHaveBeenCalled();
  });

  it('pings clients after 30 seconds', function() {

    jest.advanceTimersByTime(30 * 1000);

    expect(fakeWebSocket.ping).toHaveBeenCalledWith();
  });

  it('pings clients every 30 seconds for clients that pong', function() {
    const pong = getOn(fakeWebSocket, 'pong')
    fakeWebSocket.ping = jest.fn(pong);

    jest.advanceTimersByTime(10 * 30 * 1000);

    expect(fakeWebSocket.ping).toHaveBeenCalledTimes(10);
  });

  it('terminates clients that don\'t pong within 30 seconds', function() {

    jest.advanceTimersByTime(2 * 30 * 1000);

    expect(fakeWebSocket.ping).toHaveBeenCalledTimes(1);
    expect(fakeWebSocket.terminate).toHaveBeenCalledTimes(1);
  });

  it('stops heartbeating when the ws server closes', function() {
    const onClose = getOn(fakeWebSocketServer, 'close');

    onClose();
    jest.advanceTimersByTime(100 * 30 * 1000);

    expect(fakeWebSocket.ping).not.toHaveBeenCalled();
  });
});

function getOn(fake, action) {
  return fake.on.mock.calls.find(function(args) {
    return args[0] === action
  })[1];
}