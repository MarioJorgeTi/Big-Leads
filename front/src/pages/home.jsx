import '../assets/css/home.css';
import GeneralView from '../components/generalView';

const Home = () => {
  return (
    <main className='w-full h-screen overflow-hidden'>
      <div className='flex justify-content-center overflow-auto'>
        <GeneralView />
      </div>
    </main>
  )
}

export default Home