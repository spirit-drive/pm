import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Analise } from '../screens/Analise';
import { DNA } from '../screens/DNA';
import { Layout } from '../components/Layout';

export const Navigation: FC = () => (
  <Layout>
    <Switch>
      <Route path="/dna">
        <DNA />
      </Route>
      <Route path="*">
        <Analise />
      </Route>
    </Switch>
  </Layout>
);
