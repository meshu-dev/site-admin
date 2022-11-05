import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { environmentAction } from '../../../store/environment-slice';
import { useGetEnvironmentSitesQuery } from '../../../services/environments';
import styles from './SiteList.module.scss';
import SiteBlock from '../SiteBlock/SiteBlock';

const SiteList = () => {
  const envState = useSelector(state => state.environment);
  const dispatch = useDispatch();
  const envId = envState.selected ? envState.selected.id : 0;
  let { data: environmentSites = [], isLoading } = useGetEnvironmentSitesQuery(envId, { skip: !envId });

  useEffect(() => {
    if (envState.isLoading === true) {
      dispatch(environmentAction.finishLoading());
    }
  }, [environmentSites]);

  if (isLoading === false) {
    const siteBlocks = [];

    if (environmentSites.length > 0) {
      siteBlocks = environmentSites.map(
        (site) => {
          return <SiteBlock key={ site.id } site={ site } />
        }
      );
    } else {
      siteBlocks.push(<div key={ 'blank' }>No sites available for this environment</div>);
    }

    return (
      <div id={styles['site-list']}>
        { siteBlocks }
      </div>
    );
  }
  return (null);
}

export default SiteList; 
