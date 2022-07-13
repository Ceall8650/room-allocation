import RoomAllocation from './views/RoomAllocation';

function App() {
  return (
    <div className='flex justify-center py-8'>
      <RoomAllocation 
        guest={10}
        room={3}
        onChange={result => console.log(result)}
      />  
    </div>
  )
}

export default App
