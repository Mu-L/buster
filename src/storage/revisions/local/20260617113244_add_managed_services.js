import {getManagedLocalServiceStatus} from 'utils/app';

const message = 'Add managed services';

const revision = '20260617113244_add_managed_services';

async function upgrade() {
  const changes = {};

  const {speechService} = await browser.storage.local.get('speechService');
  if (speechService === 'witSpeechApiDemo') {
    changes.speechService = 'managed';
  }

  const localServiceStatus = await getManagedLocalServiceStatus();
  changes.enableManagedLocalServices = localServiceStatus !== 'not supported';
  changes.enableManagedRemoteServices = true;

  changes.storageVersion = revision;
  return browser.storage.local.set(changes);
}

export {message, revision, upgrade};
