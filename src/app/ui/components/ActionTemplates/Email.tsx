import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
// @ts-ignore
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { useMutation, useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Action } from '@/app/types/inputType';
import { updateActionField } from '@/app/slices/workflowSlice';
import { useDispatch } from 'react-redux';
// import { SEND_EMAIL_PDF_MUTATION } from '../components/calendar/GQL/CallApi';
// import { jwtDecode } from 'jwt-decode';

// GraphQL queries and mutations
// const GET_MODULES = gql`
//   query GetModules {
//     modules {
//       id
//       name
//       description
//     }
//   }
// `;
// const GET_ENTITIES_BY_MODULE_ID = gql`
//   query GetEntities($moduleId: ID!) {
//     entities(module_id: $moduleId) {
//       id
//       name
//       module_id
//     }
//   }
// `;
// const GET_ENTITY_BY_ID = gql`
//   query GetEntityById($entityId: String!) {
//     getEntityById(entity_id: $entityId) {
//       id
//       name
//       description
//       module_id
//       related_page
//       target_page
//       filters
//       related_filters
//     }
//   }
// `;
// const GET_ALL_PAGES = gql`
//   query GetAllPages {
//     getAllPages {
//       id
//       name
//       entity_id
//       description
//       form_schema
//       type
//     }
//   }
// `;
// const CREATE_FILLED_DATA = gql`
//   mutation CreateFilledData($pageId: ID!, $formData: JSON, $userData: JSON) {
//     createFilledData(page_id: $pageId, form_data: $formData, user_Data: $userData) {
//       id
//       page_id
//       form_data
//       user_data
//     }
//   }
// `;
// const GET_FILLED_DATA = gql`
//   query GetFilledData($pageId: ID!, $sortCol: String, $sortDir: String, $filters: JSON, $searchQuery: String, $userData: JSON) {
//     getFilledData(page_id: $pageId, sort_col: $sortCol, sort_dir: $sortDir, filters: $filters, searchQuery: $searchQuery, user_Data: $userData) {
//       id
//       page_id
//       form_data
//       user_data
//     }
//   }
// `;


// Types
interface Lead {
  id: string;
  templateName: string;
  editorContent: string;
  templateSubject: string;
}
interface FormData {
  [key: string]: string;
}
interface UserData {
  userId: string;
  email: string;
  OrganizationId: string;
}
type Page = {
  id: string;
  name: string;
};
const Email: React.FC = () => {
  const { quoteId } = useParams<{ quoteId: string }>();
  const [editorContent, setEditorContent] = useState<string>('');
  const [templateSubject, setTemplateSubject] = useState<string>('');
  const [toField, setToField] = useState<string>('');
  const [ccField, setCcField] = useState<string>('');
  const [bccField, setBccField] = useState<string>('');
  const [templateName, setTemplateName] = useState<string>('');
  const [showCc, setShowCc] = useState<boolean>(false);
  const [showBcc, setShowBcc] = useState<boolean>(false);
  const [chooseTemplateAnchorEl, setChooseTemplateAnchorEl] = useState<HTMLElement | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>('');
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [entityId, setEntityId] = useState<string | null>(null);
  const [filteredPages, setFilteredPages] = useState<any[]>([]);
  const [leadDataPage, setLeadDataPage] = useState<any | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [quotePdfDataPageId, setQuotePdfPageId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Lead[]>([]);

  //   const [sendpdfEmailMutation] = useMutation(SEND_EMAIL_PDF_MUTATION);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    attachments: [],
  });

  //   const [createFilledData, { loading: createFilledDataLoading, error: createFilledDataError }] = useMutation(CREATE_FILLED_DATA);

  //   const { data: modulesData } = useQuery(GET_MODULES);
  //   const { data: entitiesData } = useQuery(GET_ENTITIES_BY_MODULE_ID, {
  //     variables: { moduleId },
  //     skip: !moduleId,
  //   });
  //   const { data: entityData } = useQuery(GET_ENTITY_BY_ID, {
  //     variables: { entityId },
  //     skip: !entityId,
  //   });
  //   const { data: pagesData } = useQuery(GET_ALL_PAGES);

  //   useEffect(() => {
  //     if (modulesData) {
  //       const firstModule = modulesData.modules[0];
  //       if (firstModule) {
  //         setModuleId(firstModule.id);
  //       }
  //     }
  //   }, [modulesData]);

  //   useEffect(() => {
  //     if (entitiesData) {
  //       const quoteDataEntity = entitiesData.entities.find(
  //         (entity: { name: string }) => entity.name === "LeadData"
  //       );
  //       if (quoteDataEntity) {
  //         setEntityId(quoteDataEntity.id);
  //       }
  //     }
  //   }, [entitiesData]);

  //   useEffect(() => {
  //     if (pagesData) {
  //       const page = pagesData.getAllPages.find((page: any) => page.name === "LeadData");
  //       const quotePdfData = pagesData.getAllPages.find((page: Page) => page.name === "QuotePdfData");
  //       if (page) {
  //         setLeadDataPage(page);
  //       }
  //       if (quotePdfData) {
  //         setQuotePdfPageId(quotePdfData.id);
  //         console.log('QuotePdfData:', quotePdfData);
  //       }

  //       const filtered = pagesData.getAllPages.filter((page: { entity_id: string }) =>
  //         page.entity_id === entityId
  //       );
  //       setFilteredPages(filtered);
  //     }
  //   }, [pagesData, entityId]);


  //   // Fetch Data based on the quoteDataPageId
  //   const { data: pdfDataQuote, loading: loadingQuoteData, error: errorQuoteData } = useQuery(GET_FILLED_DATA, {
  //     variables: {
  //       pageId: quotePdfDataPageId,
  //       sortCol: null,
  //       sortDir: null,
  //       filters: null,
  //       searchQuery: null,
  //       userData: [{
  //         userId: "66b490545aade10e2606efba",
  //         email: "Adarsh.jain@emossy.com",
  //       }],

  //     },
  //     skip: !quotePdfDataPageId,
  //   });

  //   useEffect(() => {

  //     if (pdfDataQuote) {
  //       console.log('Fetched Filled pdf data:', pdfDataQuote);
  //     }
  //   }, [loadingQuoteData, errorQuoteData, pdfDataQuote]);


  //   // Fetch Data based on the LeadDataPageId
  //    const { data: filledDataLeadEmail, loading: loadingLeadEmail, error: errorLeadEmail } = useQuery(GET_FILLED_DATA, {
  //      variables: {
  //        pageId: leadDataPage?.id || '',  
  //        sortCol: null,
  //        sortDir: null,
  //        filters: null,
  //        searchQuery: null,
  //        userData: [{
  //         userId: "66b490545aade10e2606efba",
  //         email: "Adarsh.jain@emossy.com",
  //       }],
  //      },
  //      skip: !leadDataPage?.id,
  //    });

  //    useEffect(() => {
  //      if (filledDataLeadEmail) {
  //        console.log("Filled Data Lead Email:", filledDataLeadEmail);
  //      }
  //    });

  // useEffect(() => {
  //   if (filledDataLeadEmail) {
  //     const newTemplates = filledDataLeadEmail.getFilledData.map((data: any) => ({
  //       id: data.id,
  //       templateName: data.form_data.csygXGKaCs, // Assuming this is the template name
  //       editorContent: data.form_data['6jZPFd2PAG'], // Content
  //       templateSubject: data.form_data.XceRqN9u0x // Subject
  //     }));
  //     setTemplates(newTemplates);
  //   }
  // }, [filledDataLeadEmail]);


  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
  };

  const getBase64FromBlob = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  //   const { data: filledData, loading, error } = useQuery(GET_FILLED_DATA, {
  //     variables: {

  //       pageId: quotePdfDataPageId,
  //       sortCol: null,
  //       sortDir: null,
  //       filters: null,
  //       searchQuery: null,
  //       userData: [{
  //         userId: "66b490545aade10e2606efba",
  //         email: "Adarsh.jain@emossy.com",
  //       }],
  //     },
  //   });

  //   useEffect(() => {
  //     if (filledData) {
  //       const matchedData = filledData.getFilledData.find((data: any) => data.form_data.iPvh3pg9N === quoteId);

  //       if (matchedData && matchedData.form_data.rn589coEAV) {
  //         const base64Data = matchedData.form_data.rn589coEAV.split(',')[1]; // Remove data URL part
  //         const blob = base64ToBlob(base64Data, 'application/pdf'); // Assuming it's a PDF
  //         const url = URL.createObjectURL(blob);
  //         setPdfBlobUrl(url);
  //       }
  //     }
  //   }, [filledData, quoteId]);

  //   useEffect(() => {
  //     return () => {
  //       if (pdfBlobUrl) {
  //         URL.revokeObjectURL(pdfBlobUrl);
  //       }
  //     };
  //   }, [pdfBlobUrl]);

  // const handleSendEmail = async () => {
  //   try {
  //     let pdfBase64 = '';
  //     if (pdfBlobUrl) {
  //       const response = await fetch(pdfBlobUrl);
  //       const blob = await response.blob();
  //       pdfBase64 = await getBase64FromBlob(blob);
  //     }

  //     const { data } = await sendpdfEmailMutation({
  //       variables: {
  //         emailData: {
  //           to: toField,
  //           subject: templateSubject,
  //           message: editorContent,
  //           attachments: pdfBase64
  //             ? [
  //                 {
  //                   filename: 'Quote.pdf',
  //                   content: pdfBase64.split(',')[1],
  //                   contentType: 'application/pdf',
  //                 },
  //               ]
  //             : [],
  //         },
  //       },
  //     });

  //     if (data.sendPdfEmail) {
  //       console.log("Email sent successfully");
  //       alert('Email sent successfully!');
  //     } else {
  //       console.error("Failed to send email");
  //       alert('Failed to send email.');
  //     }

  //     handleCancel();
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //     alert('Error sending email.');
  //   }
  // };


  



  // Fetch user data from local storage
  const token = localStorage.getItem('quikit-token');
  let userData: any = null;
  // if (token) {
  //   try {
  //     userData = jwtDecode(token);
  //   } catch (error) {
  //     console.error("Failed to decode token:", error);
  //   }
  // }
  const handleSaveTemplate = () => {
    setIsPopupOpen(true);
  };

  const handleSaveWithName = async () => {
    try {
      if (newTemplateName.trim() === '') {
        alert('Please enter a template name.');
        return;
      }

      const formData: FormData = {
        XceRqN9u0x: templateSubject,
        "6jZPFd2PAG": editorContent,
        "06GkIR63Sr": "123456",
        "B528q4TdW_": toField,
        "ae2D-Q-yHo": ccField,
        "XO8WbTgllp": bccField,
        "Br7mdWqnxd": showCc.toString(),
        "PcmURtvInC": showBcc.toString(),
        "csygXGKaCs": newTemplateName,
      };

      const userData: UserData[] = [{
        userId: "66b490545aade10e2606efba",
        email: "Adarsh.jain@emossy.com",
        OrganizationId: "YourOrganizationId",
      }];

      if (leadDataPage) {
        console.log('Submitting data:', {
          pageId: leadDataPage.id,
          formData: [formData],
          userData,
        });

        // const { data } = await createFilledData({
        //   variables: {
        //     pageId: leadDataPage.id,
        //     formData: [formData],
        //     userData,
        //   },
        // });

        // console.log('Mutation response:', data);
        alert('Lead created successfully!');
        setIsPopupOpen(false);
        handleCancel();
      } else {
        alert('No page data available.');
      }
    } catch (err) {
      console.error('Error creating lead:', err);
      alert(`Failed to create lead. ${(err as Error).message}`);
    }
  };

  const handleCancel = () => {
    setEditorContent('');
    setTemplateSubject('');
    setToField('');
    setCcField('');
    setBccField('');
    setTemplateName('');
    setNewTemplateName('');
  };

  const handleCloseEditor = () => {
    handleCancel();
    alert('Editor closed');
  };

  const handleChooseTemplateClick = (event: MouseEvent<HTMLButtonElement>) => {
    setChooseTemplateAnchorEl(event.currentTarget);
  };


  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
  ];

  const handleExpandClick = () => {
    setIsExpanded(prev => !prev);

    const iframe = document.querySelector('.iframe-container iframe') as HTMLIFrameElement | null;

    if (!isExpanded && iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if ((iframe as any).mozRequestFullScreen) { // Firefox
        (iframe as any).mozRequestFullScreen();
      } else if ((iframe as any).webkitRequestFullscreen) { // Chrome, Safari & Opera
        (iframe as any).webkitRequestFullscreen();
      } else if ((iframe as any).msRequestFullscreen) { // IE/Edge
        (iframe as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) { // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari & Opera
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE/Edge
        (document as any).msExitFullscreen();
      }
    }
  };

  const handleTemplateSelection = (template: Lead) => {
    setEditorContent(template.editorContent);
    setTemplateSubject(template.templateSubject);
    setChooseTemplateAnchorEl(null); // Close the dropdown
  };

  const dispatch = useDispatch();
  const handleSendEmail = () => {

    const emaildata = {
      to: toField,
      subject: templateSubject,
      message: editorContent
    };
    const updateAction = (index: number, updates: Partial<Action>) => {

      dispatch(updateActionField({
        index,
        field: updates
      }));
    };

    updateAction(0, { data: emaildata });
  };

  return (
    <div className="flex justify-center text-black items-center h-screen  ">
      <div className="w-[850px] h-[600px] bg-white rounded-lg p-6 relative shadow-lg  overflow-auto  ">
        <h1 className="text-lg mb-3 bg-black ps-6 pe-1 py-2 text-white not-italic truncate text-left  ">
          Send E-mail
        </h1>
        <div className="px-3 pt-3 border-2 border-neutral-200 rounded-md relative overflow-auto    ">
          <div className="mb-4 relative overflow-auto  " >
            <input
              type="text"
              placeholder="To"
              value={toField}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setToField(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              style={{ border: "2px solid gray" }}
            />
            <input
              type="text"
              placeholder="Subject"
              value={templateSubject}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTemplateSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              style={{ border: "2px solid gray" }}
            />

            <div className="absolute right-3 top-3 flex -mt-2 space-x-2">
              <button
                onClick={() => setShowCc(!showCc)}
                className="bg-gray-300 rounded-full w-10 p-1"
              >
                Cc
              </button>
              <button
                onClick={() => setShowBcc(!showBcc)}
                className="bg-gray-300 rounded-full w-10 p-1"
              >
                Bcc
              </button>
            </div>
            {showCc && (
              <input
                type="text"
                placeholder="Cc"
                value={ccField}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCcField(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-2 relative placeholder-black"
              />
            )}
            {showBcc && (
              <input
                type="text"
                placeholder="Bcc"
                value={bccField}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setBccField(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-2 relative placeholder-black"
              />
            )}

            <div className="mb-4 h-64">

              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
                className="h-full"
                style={{ height: '100%' }}
              />
            </div>
            <div>
              {pdfBlobUrl && (
                <div onClick={() => setIsExpanded(!isExpanded)}
                  style={{ cursor: 'pointer', maxWidth: '100px', display: 'flex', alignItems: 'center', padding: '10px', background: '#000', borderRadius: '12px' }}>
                  {!isExpanded ? (
                    <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center', borderRadius: '8px', background: '#f9f9f9' }}>
                      <img src="https://media.istockphoto.com/id/1356214382/vector/pdf-file-icon-format-pdf-download-document-image-button-vector-doc-icon.jpg?s=612x612&w=0&k=20&c=Pp0h1HBQynL2JOVu9rMVlcX711XvjXR3UujOuPLck9M="
                        alt="PDF Thumbnail" style={{ width: '30px', marginRight: '10px' }} />

                    </div>
                  ) : (
                    <div className={`iframe-container ${isExpanded ? 'full-screen' : ''}`} onClick={() => setIsExpanded(false)}>
                      <iframe src={pdfBlobUrl} width="100%" height="100%" title="PDF Viewer" style={{ border: 'none' }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50  border-4 border-purple-700">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <input
                  type="text"
                  placeholder="New Template Name"
                  value={newTemplateName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTemplateName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <div className="flex space-x-4">
                  <button
                    onClick={handleSaveWithName}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
        <div className="flex items-start space-x-2 mt-6">
          <button onClick={handleSendEmail} className="p-2 bg-black text-white rounded-md text-sm mx-2 hover:bg-gray-700">
            Send Email
          </button>
          <button onClick={handleSaveTemplate} className="p-2 bg-black text-white rounded-md text-sm mx-2 hover:bg-gray-700">
            Save Template
          </button>
          <button onClick={handleCloseEditor} className="p-2 bg-black text-white rounded-md text-sm mx-2 hover:bg-gray-700">
            Cancel
          </button>
          <div className="relative">
            <button
              onClick={handleChooseTemplateClick}
              className="p-2 bg-black text-white rounded-md text-sm mx-2 hover:bg-gray-700"
            >
              Choose Template
            </button>
            {chooseTemplateAnchorEl && (
              <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 ">
                <ul className="max-h-60 overflow-y-auto">
                  {templates.map(template => (
                    <li
                      key={template.id}
                      onClick={() => handleTemplateSelection(template)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {template.templateName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Email;
