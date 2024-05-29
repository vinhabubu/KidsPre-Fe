import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalBlock(props) {
  const {
    show = false,
    title = "Title",
    children,
    onClose,
    onSave,
    hideSave = false,
    propsModal,
    loading,
  } = props;

  return (
    <Modal show={show} onHide={onClose} {...propsModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {show && (
          <>
            <Button variant="secondary" disabled={loading} onClick={onClose}>
              Cancel
            </Button>
            {!hideSave && (
              <Button variant="primary" disabled={loading} onClick={onSave}>
                {loading && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                )}
                Save
              </Button>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBlock;
