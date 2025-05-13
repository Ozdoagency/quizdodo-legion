import { FC, useRef } from 'react';
import { Upload, X, FileIcon, ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
};

export const FileUpload: FC<Props> = ({ 
  value = [], 
  onChange, 
  maxFiles = 3,
  acceptedFileTypes = ['.jpg', '.jpeg', '.png', '.pdf']
}) => {
  const { language } = useLanguage();
  const t = translations[language].quiz.fileUpload;
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + value.length > maxFiles) {
      alert(t.maxFilesReached.replace('{max}', maxFiles.toString()));
      return;
    }
    onChange([...value, ...files]);
  };

  const handleRemove = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const isImage = (file: File) => {
    return file.type.startsWith('image/');
  };

  return (
    <div className="space-y-4">
      <div 
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors duration-300"
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
        <div className="text-gray-600">
          <span className="font-medium text-blue-600">{t.select}</span>
          {' '}{t.dragDrop}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {t.maxFiles} {maxFiles} {t.files}. {acceptedFileTypes.join(', ')}
        </div>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
            >
              {isImage(file) ? (
                <ImageIcon className="w-5 h-5 text-blue-500" />
              ) : (
                <FileIcon className="w-5 h-5 text-blue-500" />
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-700 truncate">
                  {file.name}
                </div>
                <div className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                title={t.remove}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};