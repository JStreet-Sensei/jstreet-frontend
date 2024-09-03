import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Error404 from '../../pages/404';

describe('Error404', () => {
  it('renders Error404 component', () => {
    render(<Error404 />);

    screen.debug();
  });
});