import Header from '@/components/Header';
import TaskLogic from '@/components/TaskLogic';

const Home = () => {
  return (
      <div className="todos">
        <Header />
        <TaskLogic />
      </div>
  );
};
export default Home;
