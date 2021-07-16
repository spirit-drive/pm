import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Analise } from '../screens/Analise';
import { DNA } from '../screens/DNA';

export const Navigation = memo(() => (
  <Switch>
    <Route path="/dna">
      <DNA />
    </Route>
    <Route path="*">
      <Analise />
    </Route>
  </Switch>
));
