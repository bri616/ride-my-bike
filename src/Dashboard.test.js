import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

const allRoutes = [
    {
        polyline: 'gq{aH`d{iVHj@BGE_@XQr@s@b@i@Ba@CeBAeF@IFK^ENMLa@Hk@HOdAy@`@a@^K`@QTMXa@Nm@FIx@s@hAoAvAoAFIH]HK`A}@bAeAHGTEJG~BiC`A{@fBgBr@m@xB_Cb@m@fBkE\iA^{AHO`@a@HOl@mBpCwHr@_BH]?]Ri@`@mBRaCToA`@eDNe@Jk@Hu@?cANkBLeCAQLq@DeARgBHyAToBAWLi@@}@\kCFwAl@qHFmAZqE?s@UIo@KQIe@GaAFkBBaCCiCEm@EeA?QAm@Dq@ESGKQCOFq@GUWQUBECEBFN?N@GBGEGQCLLBYMAFJ',
        commute: 'True',
        althete_count: 2,
        distance: 309,
        average_speed: 3.4,

    }
];

test('renders stats child component with no filtered routes', () => {
  const { getAllByText } = render(<Dashboard routes={allRoutes} />);
  const statsElement = getAllByText(/Number of Trips/);
  expect(statsElement.length).toBe(1);
});
