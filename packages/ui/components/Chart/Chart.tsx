import * as React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import styles from './Chart.module.css';

type ChartProps = {
  data: any;
};

export const Chart = ({ data }: ChartProps) => (
  <div className={styles.chart}>
    <LineChart width={700} height={300} data={data}>
      <Line
        type="monotone"
        dataKey="calories"
        stroke="#4d90fe"
        strokeWidth={3}
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
    </LineChart>
  </div>
);
