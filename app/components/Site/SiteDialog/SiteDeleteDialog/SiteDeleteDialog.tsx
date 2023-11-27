import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useDeleteSiteMutation, clearCategorySites } from '@/app/services/sites'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material'
import styles from './SiteDeleteDialog.module.scss'

const SiteDeleteDialog = () => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  const environment = useAppSelector(state => state.environment)
  const site = menuSite.selected ? menuSite.selected : null
  const [deleteSite, { isLoading }] = useDeleteSiteMutation()

  const onSelection = async (doDelete) => {
    if (doDelete === true) {
      await deleteSite(site.id)
      dispatch(clearCategorySites(environment.selected.id))
    }
    dispatch(menuSiteAction.closeDelete())
    dispatch(menuSiteAction.setSelected(null))
  };

  return (
    <div>
      <Dialog
        open={ menuSite.delete ?? false }
        onClose={ () => onSelection(false) }
        scroll={ 'body' }
        fullWidth={ true }>
        <DialogTitle>Delete Site?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the site { site ? site.name : '' }?
          </DialogContentText>
        </DialogContent>
        <DialogActions id={ styles['site-dialog-btns'] }>
          <Button
            variant="contained"
            disabled={ isLoading }
            onClick={ () => onSelection(true) }>
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={ () => onSelection(false) }>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SiteDeleteDialog;
