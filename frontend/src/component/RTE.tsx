import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

 const RTE = ({onContentChange, initValue}: {onContentChange: (content: string) => void, initValue: string}) => {
    const editorRef = useRef(null);
    const apiKey = import.meta.env.VITE_EDITOR_API_KEY

    return(
        <>
            <Editor
                apiKey= {apiKey}
                onInit={(_evt: any, editor: any) => editorRef.current = editor}
                value={initValue}
                init={{
                height: 400,
                width: "100%",
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount' 
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange={(content) => onContentChange(content)}
            />
        </>
  );

}

export default RTE;