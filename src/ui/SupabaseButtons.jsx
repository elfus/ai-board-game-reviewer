import supabase from '../services/supabase';
import toast from 'react-hot-toast';

async function deleteAll() {
  const { data, error } = await supabase.from('dummy').delete().neq('id', -1);

  if (error) {
    console.error(error);
    toast.error(`Data could not be deleted ${error}`);
    throw new Error('Data could not be deleted');
  }
  return data;
}

async function uploadData() {
  const { data, error } = await supabase
    .from('dummy')
    .insert([{ title: 'Ark Nova', description: 'ZZZZZ;LKAS;LD' }]);

  if (error) {
    console.error(error);
    toast.error(`Data could not be uploaded ${error}`);
    throw new Error('Dummy data could not be inserted');
  }

  return data;
}

function SupabaseButtons() {
  function handleDelete() {
    console.log(`Deleting all data`);
    deleteAll().then(() => toast.success('Data deleted'));
  }

  function handleUpload() {
    console.log(`Uploading data`);
    uploadData().then(() => toast.success('Data uploaded'));
  }
  return (
    <div className="fixed bottom-14 left-4 flex flex-col space-y-2">
      <button
        className="text-black-300 rounded-md border-4 border-yellow-500 bg-stone-100 p-1 font-semibold transition-transform hover:scale-105"
        onClick={handleDelete}
      >
        Delete all data
      </button>

      <button
        className="text-black-300 rounded-md border-4 border-yellow-500 bg-stone-100 p-1 font-semibold transition-transform hover:scale-105"
        onClick={handleUpload}
      >
        Upload data
      </button>
    </div>
  );
}

export default SupabaseButtons;
