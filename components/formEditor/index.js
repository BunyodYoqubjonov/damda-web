import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { lang } from 'constants/lang'
import cls from './formEditor.module.scss'
import { useRouter } from 'next/router'

export default function FormEditor({ name, valueLang, formik, error }) {
  const { locale } = useRouter()
  return (
    <div className='editor'>
      {lang.map((item) => (
        <div
          key={`${name}.${item.value}`}
          style={{ display: item.value !== valueLang ? ' none' : 'block' }}
        >
          <CKEditor
            editor={ClassicEditor}
            data={formik.values[name][valueLang] || ''}
            onBlur={(event, editor) => {
              const data = editor.getData()
              formik.setFieldValue(`${name}.${valueLang}`, data)
            }}
            config={{
              toolbar: [
                'bold',
                'italic',
                'link',
                'undo',
                'redo',
                'numberedList',
                'bulletedList',
              ],
            }}
          />
          <div
            className={cls.error}
            style={{ display: item.value !== valueLang ? ' none' : 'block' }}
          >
            {error
              ? error[`${name}.${locale}`]
                ? error[`${name}.${locale}`][0]
                : null
              : null}
          </div>
        </div>
      ))}
    </div>
  )
}
