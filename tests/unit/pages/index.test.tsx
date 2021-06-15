/* ----------------------------- Unit test suite ---------------------------- *
 *
 * Target: Entry page
 * Tests:
 * - Behavior
 * - Consistency
 *
 * -------------------------------------------------------------------------- */

import React from 'react';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import Home from '@/pages/index';

/* -------------------------------------------------------------------------- */
/*                                    Mocks                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                              Bridge operations                             */
/* -------------------------------------------------------------------------- */

beforeEach(() => {
  jest.clearAllMocks();
});

/* -------------------------------------------------------------------------- */
/*                              Wrapper function                              */
/* -------------------------------------------------------------------------- */

const run = (props?) => {
  return render(<Home {...props} />);
};

/* -------------------------------------------------------------------------- */
/*                                    Tests                                   */
/* -------------------------------------------------------------------------- */

describe('Behavior', () => {
  it('renders without crash', () => {
    expect(() => {
      run();
    }).not.toThrowError();
  });
});

describe('Consistency', () => {
  it('matches the snapshot', () => {
    const tree = create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
