import useModal from 'antd/lib/modal/useModal';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
import { ListModal } from 'components/list-modal';
import './App.css';
import { List } from './screens/lists';
import { Login } from './screens/login';


function App() {
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <List />
        {/* <Login /> */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
