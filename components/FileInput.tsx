// components/FileInput.tsx
export const FileInput = ({ label, ...props }) => (
    <div>
      <label className="text-white">{label}</label>
      <input type="file" className="mt-1" {...props} />
    </div>
  );