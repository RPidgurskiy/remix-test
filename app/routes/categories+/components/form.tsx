import {Box} from '@mui/material';

import {AppInput} from '~/global/components/app-input';
import {AppInputSwitch} from '~/global/components/app-input-switch';
import {useTranslation} from "react-i18next";

//
//

export const CategoriesForm = () => {
  const {t} = useTranslation(['common', 'categories']);
  // fixed issue with undefined I18n library
  return (
    <>
      <AppInput
        name="title.ar"
        label={t('common:title') + ' ' + t('common:lang.ar')}
        variant="filled"
      />

      <AppInput
        name="title.en"
        label={t('common:title') + ' ' + t('common:lang.en')}
        variant="filled"
      />

      <Box mt={2} />

      <AppInputSwitch name="isActive" label={t('common:active')} />
    </>
  );
};
