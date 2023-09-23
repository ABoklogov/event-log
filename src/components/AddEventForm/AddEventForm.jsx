
import { useRef } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import s from './AddEventForm.module.css';

function AddEventForm() {
  const toast = useRef(null);

  const show = () => {
    toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.value });
  };

  const formik = useFormik({
    initialValues: {
      importance: '', // важность
      equipment: '', // оборудование
      message: '', // сообщение
      responsible: '', // ответственный
    },
    validate: (data) => {
      let errors = {};

      if (!data.equipment) {
        errors.equipment = 'equipment - Surname is required.';
      }
      if (!data.message) {
        errors.message = 'message - Surname is required.';
      }

      return errors;
    },
    onSubmit: (data) => {
      data && show(data);
      formik.resetForm();
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <div className={s.formContainer}>
      <div className="card flex justify-content-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-column gap-2 form"
          style={{ width: '100%' }}
        >
          <Toast ref={toast} />

          <span className="mb-2">
            {/* оборудование */}
            <span className="p-float-label">
              <InputText
                id="equipment"
                name="equipment"
                value={formik.values.equipment}
                onChange={(e) => {
                  formik.setFieldValue('equipment', e.target.value);
                }}
                style={{ width: '100%' }}
                className={classNames({ 'p-invalid': isFormFieldInvalid('equipment') })}
              />
              <label htmlFor="input_value">оборудование</label>
            </span>
            {getFormErrorMessage('equipment')}
          </span>

          <span className="mb-2">
            {/* сообщение */}
            <span className="p-float-label">
              <InputText
                id="message"
                name="message"
                value={formik.values.message}
                onChange={(e) => {
                  formik.setFieldValue('message', e.target.value);
                }}
                style={{ width: '100%' }}
                className={classNames({ 'p-invalid': isFormFieldInvalid('message') })}
              />
              <label htmlFor="input_value">сообщение</label>
            </span>

            {getFormErrorMessage('message')}
          </span>
          <Button type="submit" label="Submit" />
        </form>
      </div>
    </div>
  )
};

export default AddEventForm;