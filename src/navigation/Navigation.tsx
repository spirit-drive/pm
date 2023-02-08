import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analise } from '../screens/Analise';
import { DNA } from '../screens/DNA';
import { Layout } from '../components/Layout';

export const Navigation: FC = () => (
  <Layout>
    <Routes>
      <Route path="/dna" element={<DNA />} />
      <Route path="*" element={<Analise />} />
    </Routes>
  </Layout>
);
