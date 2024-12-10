import { useSelector, useDispatch } from 'react-redux';
import { useAddEnvironmentMutation } from '@/services/environments';
import { mainAction } from '@/store/main-slice';
import { menuEnvironmentAction } from '@/store/menu-environment-slice';
import EnvFormDialog from './EnvFormDialog';

const EnvAddDialog = () => {
  const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [addEnvironment, { isLoading }] = useAddEnvironmentMutation();

  const onSaveClick = async (envName) => {
    dispatch(mainAction.clearStatusMsg());

    const params = { name: envName };
    const response = await addEnvironment(params);

    setStatusMsg(response);

    if (response['data']['errors'] == null) {
      onCloseClick();
    }
  };

  const setStatusMsg = (response) => {
    if (response['data']['errors']) {
      const data = response['data']['errors'];
      let messages = [];

      if (data['name']) {
        messages.push(data['name']);
      }

      const params = {
        type: 'error',
        messages: messages
      };

      dispatch(mainAction.setStatusMsg(params));
    }
  };

  const onCloseClick = () => {
    dispatch(menuEnvironmentAction.closeAdd());
    dispatch(menuEnvironmentAction.openList());
  };

  const addForm = (<EnvFormDialog
                      title={ 'Add Environment' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuEnvironment.add ? addForm : null }
    </div>
  );
};

export default EnvAddDialog;