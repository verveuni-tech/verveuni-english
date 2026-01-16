import { memo } from 'react';
import Hero from '../components/Hero';
import Layout from '../layout/layout';
import How from '../components/How';
import Feedback from '../components/FeedbackUI';
import FeedbackOutput from '../components/FeedbackOutput';
import Simulation from '../components/Simulation';
const Landing = () => {
    return (
         <Layout> 
        <div className="min-h-screen bg-base-100">

            <Hero />
           <Simulation/>
           <How/>
           <Feedback/>
           <FeedbackOutput/>
        </div>
        </Layout>
    );
};

export default memo(Landing);