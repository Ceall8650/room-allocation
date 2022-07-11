import RoomAllocation from './views/RoomAllocation';

function App() {
  return (
    <div className='flex justify-center items-center h-full'>
      <RoomAllocation 
        guest={10}
        room={3}
        onChange={result => console.log(result)}
      />  
    </div>
  )
}

export default App
