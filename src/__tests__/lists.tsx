import { setupServer } from 'msw/node'
import { rest } from "msw"
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { List } from '../screens/lists';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient()

const API_URL = "http://localhost:3001"

const fakeLists = [
  {
    "title": "I am Maroon",
    "description": "222",
    "id": 2,
    "checked": false
  },
  {
    "title": "44",
    "description": "4444",
    "id": 4,
    "checked": false
  }
]

const server = setupServer(
    rest.get(`${API_URL}/lists`, (req, res, ctx) => res(ctx.json(fakeLists)))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// NOTE： Unable to find an element with the text: I am Maroon. This could be because the text is broken up by multiple elements.
// In this case, you can provide a function for your text matcher to make your matcher more flexible.
// const waitLists = () => waitFor(() => expect(screen.getByText("I am Maroon")).toBeInTheDocument());
const waitLists = () => waitFor(() => expect(screen.getByText(/Maroon/)).toBeInTheDocument());

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

describe('list组件', () => {
  test('列表展示正常', async () => {
    renderWithProvider(<List />,  { route: "/lists" })
    // NOTE: 此时还是loading状态，查询不到listItem, 需要await waitLists();
    await waitLists();
    expect(screen.getAllByTestId('list-item').length).toBe(fakeLists.length)
  })
  
  // test("输入框提交后，列表项应该增加", async () => {
  //   renderWithProvider(<List />,  { route: "/lists" })
  //   const listForm = screen.getByTestId('list-form');
  //   const addItem = {
  //     "title": "I am Maroon3",
  //     "description": "333",
  //     "id": 3
  //   }
  //   //TODO: form的submit事件如何用fireEvent模拟
  //   // fireEvent.submit(listForm, {
  //   // })
  //   const list = screen.getAllByTestId('list-item')
  //   await waitLists();
  //   // expect(list.length).toBe(3)
  //   expect(list[2]).toEqual(addItem)
  // })

  // test("删除按钮点击后，列表项长度减一", async () => {
  //   renderWithProvider(<List />,  { route: "/lists" })
  //   const deleteIcon = screen.getByTestId('list-form');
  //   fireEvent.click(deleteIcon)
  //   await waitLists();
  //   const list = screen.getAllByTestId('list-item')
  //   expect(list.length).toBe(1)
  // })

  // test('编辑checkbox，状态会变', async () => {
  //   renderWithProvider(<List />,  { route: "/lists" })
  //   await waitLists();
  //   const list = screen.getAllByTestId('list-item')
  //   const checkedIcon = list[0].querySelector('[data-testid="check-icon"]') as HTMLInputElement;
  //   fireEvent.change(checkedIcon, {
  //     target: {
  //       value: true
  //     }
  //   })
  //   expect(list[0]).toHaveProperty('checked', true)
  // })
})




