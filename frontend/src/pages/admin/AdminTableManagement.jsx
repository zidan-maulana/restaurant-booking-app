import { useState, useEffect } from 'react';
import { getTables, createTable, updateTable, deleteTable } from '../../services/admin';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function AdminTableManagement({ onNavigate }) {
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Table form state
  const [selectedTable, setSelectedTable] = useState(null); // table being edited/deleted
  const [formNumber, setFormNumber] = useState('');
  const [formCapacity, setFormCapacity] = useState('');
  const [formError, setFormError] = useState('');
  
  // Modals visibility state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const loadTables = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getTables();
      setTables(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal memuat data meja.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleOpenAddModal = () => {
    setSelectedTable(null);
    setFormNumber('');
    setFormCapacity('');
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (table) => {
    setSelectedTable(table);
    setFormNumber(table.table_number);
    setFormCapacity(table.capacity.toString());
    setFormError('');
    setIsFormModalOpen(true);
  };

  const handleOpenDeleteModal = (table) => {
    setSelectedTable(table);
    setFormError('');
    setIsDeleteModalOpen(true);
  };

  const handleCloseModals = () => {
    setSelectedTable(null);
    setFormNumber('');
    setFormCapacity('');
    setFormError('');
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formNumber || !formCapacity) {
      setFormError('Semua kolom wajib diisi.');
      return;
    }

    setIsSubmitLoading(true);
    setFormError('');

    try {
      if (selectedTable) {
        // Edit mode
        await updateTable(selectedTable.id, {
          table_number: formNumber,
          capacity: Number(formCapacity),
        });
      } else {
        // Add mode
        await createTable({
          table_number: formNumber,
          capacity: Number(formCapacity),
        });
      }
      await loadTables();
      handleCloseModals();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data meja.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTable) return;
    setIsSubmitLoading(true);
    setFormError('');
    try {
      await deleteTable(selectedTable.id);
      await loadTables();
      handleCloseModals();
    } catch (err) {
      setFormError(err.message || 'Gagal menghapus meja.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 border-b border-bitter-chocolate/10 pb-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-antique-gold block mb-2">
            Panel Administrator
          </span>
          <h1 className="font-serif italic text-3xl sm:text-4xl text-bitter-chocolate">
            Kelola Meja Restoran
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 bg-bitter-chocolate text-warm-cream hover:bg-antique-gold font-sans text-xs font-bold uppercase tracking-[0.15em] rounded-md transition-colors duration-300 cursor-pointer"
        >
          Tambah Meja
        </button>
      </div>

      {/* Main Error */}
      {error && (
        <div className="mb-8 p-4 bg-terracotta-bg border border-terracotta-text/10 text-terracotta-text text-sm rounded-lg flex flex-col items-center gap-3">
          <p>{error}</p>
          <button
            onClick={loadTables}
            className="px-4 py-2 bg-bitter-chocolate text-warm-cream rounded-md text-xs font-bold uppercase tracking-wider hover:bg-antique-gold transition-colors duration-300 cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Grid of Tables */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-antique-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tables.length === 0 ? (
        <div className="text-center py-16 px-4 bg-warm-cream-dark/20 border border-bitter-chocolate/10 rounded-lg max-w-lg mx-auto">
          <h3 className="font-serif italic text-xl text-bitter-chocolate mb-2">
            Belum Ada Meja
          </h3>
          <p className="font-sans text-xs text-bitter-chocolate/55 max-w-xs mx-auto leading-relaxed">
            Tidak ada meja terdaftar. Silakan klik tombol "Tambah Meja" untuk menambahkan meja baru ke sistem.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tables.map((table) => (
            <div
              key={table.id}
              className="bg-warm-cream-dark/20 border border-bitter-chocolate/10 rounded-lg p-6 flex flex-col items-center justify-between text-center relative hover:border-antique-gold hover:bg-warm-cream-dark/30 transition-all duration-300 shadow-sm"
            >
              {/* Badge/Icon Table number */}
              <div className="font-serif text-2xl italic font-bold text-bitter-chocolate mb-2">
                {table.table_number}
              </div>

              {/* Details */}
              <div className="text-xs text-bitter-chocolate/60 font-sans mb-4">
                Kapasitas: <span className="font-bold text-antique-gold">{table.capacity} Kursi</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={() => handleOpenEditModal(table)}
                  className="flex-1 px-2 py-1.5 border border-bitter-chocolate/10 hover:border-bitter-chocolate text-[10px] font-bold uppercase tracking-wider rounded-md text-bitter-chocolate transition-colors duration-300 cursor-pointer bg-warm-cream"
                >
                  Ubah
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(table)}
                  className="px-2 py-1.5 border border-terracotta-text/20 hover:border-terracotta-text text-terracotta-text hover:bg-terracotta-bg/10 text-[10px] font-bold uppercase tracking-wider rounded-md transition-colors duration-300 cursor-pointer"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form Add / Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        title={selectedTable ? 'Ubah Data Meja' : 'Tambah Meja Baru'}
        confirmText={selectedTable ? 'Simpan' : 'Tambah'}
        cancelText="Batal"
        onConfirm={() => document.getElementById('tableForm').requestSubmit()}
        isLoading={isSubmitLoading}
      >
        <form id="tableForm" onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <Input
            label="Nomor Meja"
            id="table_number"
            type="text"
            value={formNumber}
            onChange={(e) => setFormNumber(e.target.value)}
            placeholder="Contoh: T11"
            required
            disabled={isSubmitLoading}
            className="!rounded-md"
          />

          <Input
            label="Kapasitas Meja (Kursi)"
            id="capacity"
            type="number"
            min="1"
            max="20"
            value={formCapacity}
            onChange={(e) => setFormCapacity(e.target.value)}
            placeholder="Contoh: 4"
            required
            disabled={isSubmitLoading}
            className="!rounded-md"
          />

          {formError && (
            <p className="text-xs text-terracotta-text font-medium text-center bg-terracotta-bg p-2 rounded-md border border-terracotta-text/10">
              {formError}
            </p>
          )}
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModals}
        title="Hapus Meja"
        confirmText="Ya, Hapus"
        cancelText="Batal"
        onConfirm={handleDeleteConfirm}
        isDangerous={true}
        isLoading={isSubmitLoading}
      >
        {selectedTable && (
          <div className="space-y-4">
            <p className="text-sm text-bitter-chocolate/75 leading-relaxed">
              Apakah Anda yakin ingin menghapus <strong>Meja {selectedTable.table_number}</strong>? Tindakan ini dapat memengaruhi data reservasi yang terhubung dengan meja ini.
            </p>
            {formError && (
              <p className="text-xs text-terracotta-text font-medium text-center bg-terracotta-bg p-2 rounded-md border border-terracotta-text/10">
                {formError}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
