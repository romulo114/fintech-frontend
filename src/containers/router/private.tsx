import { Outlet } from 'react-router-dom';

import { PublicLayout } from 'containers/layout/public';
import { PrivateLayout } from 'containers/layout/private';
import { ProtectedRoute } from './protected-route';

import { Dashboard } from 'containers/pages/user/business/dashboard';
import { Trades } from 'containers/pages/user/business/trades';
import { Documentation } from 'containers/pages/user/business/documentation';
import { ActivateUser } from 'containers/pages/user/general/activate';
import { Profile } from 'containers/pages/user/general/profile';
import { AccountsPage } from 'containers/pages/user/business/accounts/accounts';
import { AccountCreatePage } from 'containers/pages/user/business/accounts/account-create';
import { AccountUpdatePage } from 'containers/pages/user/business/accounts/account-update';
import { PortfoliosPage } from 'containers/pages/user/business/portfolios/portfolios';
import { PortfolioCreate } from 'containers/pages/user/business/portfolios/portfolio-create';
import { PortfolioUpdate } from 'containers/pages/user/business/portfolios/portfolio-update';
import { StrategyList } from 'containers/pages/user/business/strategies/strategies';
import { StrategyCreate } from 'containers/pages/user/business/strategies/strategy-create';
import { StrategyUpdate } from 'containers/pages/user/business/strategies/strategy-update';

export const PrivateRoutes = {
  path: '/user',
  element: <ProtectedRoute />,
  children: [
    {
      path: '/user',
      element: <PublicLayout />,
      children: [
        {
          path: '/user/activate',
          element: <ActivateUser />
        },
        {
          path: '/user/profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '/user/business',
      element: <PrivateLayout />,
      children: [
        {
          path: '/user/business/dashboard',
          element: <Dashboard />
        },
        {
          path: '/user/business/accounts',
          element: <Outlet />,
          children: [
            {
              path: '/user/business/accounts',
              element: <AccountsPage />
            },
            {
              path: '/user/business/accounts/create',
              element: <AccountCreatePage />
            },
            {
              path: '/user/business/accounts/:accountId',
              element: <AccountUpdatePage />
            }
          ]
        },
        {
          path: '/user/business/portfolios',
          element: <Outlet />,
          children: [
            {
              path: '/user/business/portfolios',
              element: <PortfoliosPage />
            },
            {
              path: '/user/business/portfolios/create',
              element: <PortfolioCreate />
            },
            {
              path: '/user/business/portfolios/:accountId',
              element: <PortfolioUpdate />
            }
          ]
        },
        {
          path: '/user/business/trades',
          element: <Trades />
        },
        {
          path: '/user/business/strategies',
          element: <Outlet />,
          children: [
            {
              path: '/user/business/strategies',
              element: <StrategyList />
            },
            {
              path: '/user/business/strategies/create',
              element: <StrategyCreate />
            },
            {
              path: '/user/business/strategies/:accountId',
              element: <StrategyUpdate />
            }
          ]
        },
        {
          path: '/user/business/documentation',
          element: <Documentation />
        }
      ]
    }
  ]
};
