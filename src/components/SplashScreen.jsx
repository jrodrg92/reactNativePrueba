import React, {useEffect, useState} from 'react';

import {
  /*CHECK_FOR_UPDATE_PENDING,*/
  CHECK_FOR_UPDATE_SUCCESS,
  CHECK_FOR_UPDATE_FAILURE,
  DOWNLOAD_UPDATE_PENDING,
  DOWNLOAD_UPDATE_SUCCESS,
  DOWNLOAD_UPDATE_FAILURE,
  QUIT_AND_INSTALL_UPDATE,
} from '../ipc-constants';

import {version as currentAppVersion} from './../../package.json';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import {Text, Button} from '@chakra-ui/react';

import isElectron from 'is-electron';

let ipcRenderer;
let quitAndInstallUpdate;

export default function SplashScreen() {
  if (isElectron()) {
    ipcRenderer = window.require('electron').ipcRenderer;
  }

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isUpdateDownloaded, setIsUpdateDownloaded] = useState(false);

  if (isElectron()) {
    quitAndInstallUpdate = () => {
      ipcRenderer.send(QUIT_AND_INSTALL_UPDATE);
    };
  }

  useEffect(() => {
    //ipcRenderer.send(CHECK_FOR_UPDATE_PENDING);
    if (isElectron()) {
      ipcRenderer.on(CHECK_FOR_UPDATE_SUCCESS, (event, updateInfo) => {
        const version = updateInfo && updateInfo.version;

        if (version && version !== currentAppVersion) {
          ipcRenderer.send(DOWNLOAD_UPDATE_PENDING);

          console.log('HAY UPDATES');
          onOpen();
        } else {
          console.log('NO HAY UPDATES');
        }
      });

      ipcRenderer.on(CHECK_FOR_UPDATE_FAILURE, () => {
        console.log('FALLO AL COMPROBAR UPDATES');
      });

      ipcRenderer.on(DOWNLOAD_UPDATE_SUCCESS, () => {
        setIsUpdateDownloaded(true);
        console.log('SE HA DESCARGADO UN UPDATE');
      });

      ipcRenderer.on(DOWNLOAD_UPDATE_FAILURE, () => {
        console.log('HA FALLADO AL DESCARGAR EL UPDATE');
      });
    }
  }, [onOpen, isUpdateDownloaded]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Available</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            bgGradient="linear(to-r, blue.500,yellow.500)"
            bgClip="text"
            fontSize="xl"
            style={{fontVariant: 'small-caps'}}>
            {currentAppVersion}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={quitAndInstallUpdate}>
            Update
          </Button>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Discard
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
