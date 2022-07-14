import './matchMedia.mock';
import { setupServer } from 'msw/node'
import { rest } from "msw"
import { render, screen, waitFor } from '@testing-library/react'
import { List } from '../screens/lists';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient()
const API_URL = "http://localhost:3001"
const fakeLists = [{
    "title": "22",
    "description": "222",
    "id": 2
  },
  {
    "title": "44",
    "description": "4444",
    "id": 4
  }]

const server = setupServer(
    rest.get(`${API_URL}/lists`, (req, res, ctx) => res(ctx.json(fakeLists)))
)

const waitLists = () =>
  waitFor(() => expect(screen.getByTestId("list-item")).toBeInTheDocument(), {
    timeout: 3000,
  });

const renderWithProvider = (component: ReactNode, { route = "lists" } = {}) => {
  window.history.pushState({}, "Test page", route)
  return render (
    <QueryClientProvider client={queryClient}>
      <Router>
          {component}
      </Router>
  </QueryClientProvider>
  )
}

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('列表展示正常', async () => {
  renderWithProvider(<List />,  { route: "/lists" })
  await waitLists();
  expect(screen.getAllByTestId('list-item').length).toBe(fakeLists.length)
})