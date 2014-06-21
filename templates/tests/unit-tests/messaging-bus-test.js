(function(define, sinon, describe, beforeEach, it, expect) {
  'use strict';

  var TEST_MESSAGE_TYPE = 'testMessage';
  var TEST_MESSAGE_BODY = 'some message content';
  var ANOTHER_TEST_MESSAGE_TYPE = 'anotherTestMessage';

  var testEntryPoint = function(messagingBusConfiguration, messagingBus) {
    var testMessageHandler = sinon.spy();
    var anotherTestMessagehandler1 = sinon.spy();
    var anotherTestMessagehandler2 = sinon.spy();

    describe('Test core functionality of messaging bus', function() {

      beforeEach(function(done) {
        messagingBusConfiguration[TEST_MESSAGE_TYPE] = [
          testMessageHandler
        ];

        messagingBusConfiguration[ANOTHER_TEST_MESSAGE_TYPE] = [
          anotherTestMessagehandler1, anotherTestMessagehandler2
        ];

        testMessageHandler.reset();
        anotherTestMessagehandler1.reset();
        anotherTestMessagehandler2.reset();

        done();
      });


      describe('messaging code should call only handlers for sended message type', function() {

        it('should call handler for TEST_MESSAGE_TYPE once', function(done) {
          messagingBus.send(TEST_MESSAGE_TYPE, TEST_MESSAGE_BODY);

          expect(testMessageHandler.calledOnce).to.be.true;
          expect(testMessageHandler.calledWith(TEST_MESSAGE_BODY)).to.be.true;

          expect(anotherTestMessagehandler1.called).to.be.false;
          expect(anotherTestMessagehandler2.called).to.be.false;

          done();
        });

        it('should call two handlers of "ANOTHER_TEST_MESSAGE_TYPE"', function(done) {
          messagingBus.send(ANOTHER_TEST_MESSAGE_TYPE, TEST_MESSAGE_BODY);

          expect(anotherTestMessagehandler1.calledOnce).to.be.true;
          expect(anotherTestMessagehandler1.calledWith(TEST_MESSAGE_BODY)).to.be.true;

          expect(anotherTestMessagehandler2.calledOnce).to.be.true;
          expect(anotherTestMessagehandler2.calledWith(TEST_MESSAGE_BODY)).to.be.true;

          expect(anotherTestMessagehandler2.calledAfter(anotherTestMessagehandler1)).to.be.true;

          expect(testMessageHandler.called).to.be.false;

          done();
        });
 
      });
    });
  };
  define(['config/messaging-bus-configuration', 
         'sources/js/utilities/messaging-bus'], testEntryPoint);
}(
  window.define,
  window.sinon,
  window.describe,
  window.beforeEach,
  window.it,
  window.chai.expect
));
