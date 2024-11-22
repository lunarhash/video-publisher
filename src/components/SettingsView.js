import React, { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { validateDropboxConfig } from '../utils/validators';

const SettingsView = ({ dropboxConfig, setDropboxConfig }) => {
  const [status, setStatus] = useState({
    testing: false,
    saving: false,
    success: null,
    message: ''
  });

  const testConnection = async () => {
    const errors = validateDropboxConfig(dropboxConfig);
    if (Object.keys(errors).length > 0) {
      setStatus({
        testing: false,
        saving: false,
        success: false,
        message: '请填写所有必填字段'
      });
      return;
    }

    setStatus({ ...status, testing: true, message: '' });
    try {
      // 模拟API测试
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({
        testing: false,
        saving: false,
        success: true,
        message: 'Dropbox API 连接成功！'
      });
    } catch (error) {
      setStatus({
        testing: false,
        saving: false,
        success: false,
        message: error.message || '连接失败，请检查配置。'
      });
    }
  };

  const handleSave = async () => {
    const errors = validateDropboxConfig(dropboxConfig);
    if (Object.keys(errors).length > 0) {
      setStatus({
        testing: false,
        saving: false,
        success: false,
        message: '请填写所有必填字段'
      });
      return;
    }

    setStatus({ ...status, saving: true, message: '' });
    try {
      // 模拟保存操作
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({
        testing: false,
        saving: false,
        success: true,
        message: '配置保存成功！'
      });
    } catch (error) {
      setStatus({
        testing: false,
        saving: false,
        success: false,
        message: '保存失败，请重试。'
      });
    }
  };

  const fields = [
    { key: 'apiKey', label: 'API Key', required: true },
    { key: 'apiSecret', label: 'API Secret', required: true },
    { key: 'accessToken', label: 'Access Token', required: true },
    { key: 'refreshToken', label: 'Refresh Token', required: true }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Dropbox 配置</h2>
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key}>
            <label className="label">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="password"
              className={`input ${
                !dropboxConfig[field.key] && status.success === false
                  ? 'border-red-300'
                  : ''
              }`}
              value={dropboxConfig[field.key]}
              onChange={e => setDropboxConfig({
                ...dropboxConfig,
                [field.key]: e.target.value
              })}
            />
          </div>
        ))}
        
        <div className="flex gap-2">
          <button
            className={`btn btn-secondary flex items-center ${
              status.testing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={testConnection}
            disabled={status.testing || status.saving}
          >
            {status.testing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                测试中...
              </>
            ) : (
              '测试连接'
            )}
          </button>
          <button
            className={`btn btn-primary flex items-center ${
              status.saving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSave}
            disabled={status.testing || status.saving}
          >
            {status.saving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                保存配置
              </>
            )}
          </button>
        </div>

        {status.message && (
          <div className={`p-4 rounded ${
            status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsView;