// import { render, screen } from '@testing-library/react';
// import { ErrorBoundary } from '../components/error-boundary';

// test('ErrorBoundary', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();  
// });

import { setupServer } from 'msw/node'
import { rest } from "msw"
import { http } from 'utils/http'

const API_URL = "http://localhost:3001"
const server = setupServer()
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('http方法发送异步请求', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: "mock"}

  server.use(
    rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => res(ctx.json(mockResult))
    )
  )
  
  const result = await http(endpoint)

  expect(result).toEqual(mockResult)
})

// test('http请求失败', async () => {
//   const endpoint = 'test-endpoint'

//   server.use(
//     rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => res(ctx.status(500)))
//     )
  
//   const result = await http(endpoint)
//   console.log(result)
// })

// test('http请求时会在header里带上token', async () => {
//   const token = "FAKE_TOKEN"
//   const endpoint = 'test-endpoint'
//   const mockResult = {mockValue: "mock"}

//   let request: any

//   server.use(
//     rest.get(`${API_URL}/${endpoint}`, (req, res, ctx) => {
//       request = req
//       return res(ctx.json(mockResult))
//     })
//   )

//   await http(endpoint, {token})

//   expect(request.headers.get('Authrozation')).toBe(`Bearer ${token}`)
// })
