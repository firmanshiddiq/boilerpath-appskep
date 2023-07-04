import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Jobs from './Jobs';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';


const JobsContainer = () => {
  const {jobs, isLoading} = useSelector((store)=>store.allJobs);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getAllJobs());
  },[]);

  if(isLoading){
    return (
      <Loading center />
    );
  }

  if(jobs.length === 0){
    return (
      <Wrapper>
        <h2>Tidak ada job yang tersedia...</h2>
      </Wrapper>
    );
  }


  return (
    <Wrapper>
      <h5>info jobs</h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  )
}

export default JobsContainer
