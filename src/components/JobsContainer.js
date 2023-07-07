import React, { useEffect } from 'react';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Jobs from './Jobs';
import Loading from './Loading';
import { getAllJobs } from '../features/allJobs/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


const JobsContainer = () => {
  const {
    jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllJobs());
  },[page,search,searchStatus,searchType,sort]);

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
      <h5>
      {totalJobs} job ditemukan
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Jobs key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer
