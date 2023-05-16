import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { MessageData, RootState } from 'types';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  text-align: center;
`;

const ModalInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-family: 'Indie Flower';
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalButton = styled.button`
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function Modal({ isOpen, onClose }: ModalProps) {
  const messages = useSelector<RootState>(({ story }) => story.messages) as Array<MessageData>;
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  const handleOK = async () => {
    if (!inputValue) {
      return;
    }

    const createResponse = await (window as any).gapi.client.docs.documents.create({
      title: inputValue,
    });

    console.log(createResponse.result);

    // now that we created the doc, let's add content using the
    // documentId returned from the create call.
    const documentId = createResponse?.result?.documentId; // nullish coalescing operator

    if (documentId) {
      let text = '';
      // const ranges: number[][] = [];

      messages.forEach((value, index) => {
        if (index < 2) {
          return;
        }

        if (value.role === 'assistant') {
          // ranges.push([text.length + 1, text.length + 8]);
          text += `ChatGPT4\r\n${value.content}\r\n\r\n`;
        } else if (value.role === 'user') {
          // ranges.push([text.length + 1, text.length + 12 + value.content.length]);
          text += `User Input: ${value.content}\r\n\r\n`;
        }
      });
      const updateResponse = await (window as any).gapi.client.docs.documents.batchUpdate({
        documentId,
        requests: [
          {
            insertText: {
              endOfSegmentLocation: {},
              text,
            },
          },
          /* ...ranges.map(([start, end]) => ({
            updateTextStyle: {
              range: {
                startIndex: start,
                endIndex: end,
              },
              textStyle: {
                bold: true,
              },
              fields: 'bold',
            },
          })) */
        ],
      });

      console.log(updateResponse.result);
      window.open(`https://docs.google.com/document/d/${documentId}/edit`);
    }

    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalTitle>Save story</ModalTitle>
        <ModalInput onChange={handleInputChange} type="text" value={inputValue} />
        <ModalActions>
          <ModalButton onClick={handleOK}>OK</ModalButton>
          <ModalButton onClick={handleCancel}>Cancel</ModalButton>
        </ModalActions>
      </ModalContent>
    </ModalWrapper>
  );
}

export default Modal;
