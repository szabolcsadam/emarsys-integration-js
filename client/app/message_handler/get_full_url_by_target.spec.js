'use strict';

const getFullUrlByTarget = require('./get_full_url_by_target');

describe('getFullUrlByTarget', () => {
  it('should return the right url for the target filled with params', () => {
    const url = getFullUrlByTarget({ sessionId: 'the_session', target: 'me_push/edit', params: { id: 1 } });
    expect(url).to.eql(
      'bootstrap.php?session_id=the_session&r=service/index&service=push-notification&iframe=show&#/campaigns/1'
    );
  });

  it('should replace placeholders with empty string if a parameter was not given', () => {
    const url = getFullUrlByTarget({
      sessionId: 'super_session',
      target: 'program/summary',
      params: { program_id: 42 }
    });

    expect(url).to.eql(
      'bootstrap.php?session_id=super_session&r=program/summary&programId=42&start_date=&end_date='
    );
  });
});
