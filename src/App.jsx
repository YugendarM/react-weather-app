import React from 'react'
import WeatherComponent from './components/WeatherComponent/WeatherComponent'
import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {

  const queryClient = new QueryClient();
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
              <WeatherComponent />
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App
