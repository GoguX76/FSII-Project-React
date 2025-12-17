import React, { useState, useEffect } from 'react';
import '../css/dashboard.css';
import { ServerCrash } from 'lucide-react';
import ProductModal from '../components/ProductModal';
import ConfirmModal from '../components/ConfirmModal';
import API_BASE_URL from '../config/api';

const emptyProduct = {
  title: '',
  image: '',
  desc: '',
  fullDesc: '',
  price: '',
  stock: '',
  category: '',
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null => creating
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Error connecting to the API.');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (e) {
      console.error("Error fetching categories", e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setIsModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setForm({
      title: p.title || '',
      image: p.image || '',
      desc: p.desc || '',
      fullDesc: p.fullDesc || '',
      price: p.price != null ? String(p.price) : '',
      stock: p.stock != null ? String(p.stock) : '0',
      category: p.category || 'brazilian',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setForm(emptyProduct);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Leer el archivo como DataURL (base64) y guardarlo en form.image
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      // Guardamos el dataURL en el form para enviarlo en el payload
      setForm((f) => ({ ...f, image: dataUrl }));

      // Actualizar preview si existe
      const previewImage = document.getElementById('image-preview');
      if (previewImage) {
        previewImage.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        image: form.image,
        desc: form.desc,
        fullDesc: form.fullDesc,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        category: form.category,
      };

      let res;
      if (editingProduct) {
        // update
        res = await fetch(`${API_BASE_URL}/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editingProduct, ...payload }),
        });
      } else {
        // create
        res = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error('No se pudo guardar el producto.');

      await fetchProducts();
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };



  const handleDelete = async (p) => {
    // open confirmation modal
    setPendingDelete(p);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      const res = await fetch(`${API_BASE_URL}/products/${pendingDelete.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('No se pudo eliminar el producto.');
      await fetchProducts();
      setPendingDelete(null);
    } catch (err) {
      setError(err.message);
      setPendingDelete(null);
    }
  };

  const cancelDelete = () => setPendingDelete(null);

  if (loading) {
    return <div className="dashboard-page"><div className="inner-container"><p>Cargando productos...</p></div></div>;
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="inner-container error-container">
          <ServerCrash size={48} />
          <h2>Error de Conexión</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="inner-container">
        <div className="dashboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="dashboard-title">Gestión de Productos</h1>
              <p className="dashboard-subtitle">Lista de productos disponibles</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={openAdd}>Agregar producto</button>
            </div>
          </div>

          <div className="table-container mt-6">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <img
                        src={product.image ? (product.image.startsWith('data:') ? product.image : product.image.startsWith('/') ? product.image : `/src/assets/images/${product.image}`) : '/src/assets/images/placeholder-image.jpg'}
                        alt={product.title || 'Imagen'}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }}
                        onError={(e) => { e.target.src = '/src/assets/images/placeholder-image.jpg'; e.target.alt = 'Imagen no disponible'; }}
                      />
                    </td>
                    <td>{product.title || product.name || '—'}</td>
                    <td>${(typeof product.price === 'number') ? product.price.toFixed(2) : product.price}</td>
                    <td>{product.stock || 0}</td>
                    <td>
                      {(!product.category || product.category === 'brazilian') ? 'Phonk Brasileño' :
                        (product.category === 'japanese' ? 'Phonk Japonés' : product.category)}
                    </td>
                    <td>
                      <button className="btn-secondary" onClick={() => setViewProduct(product)}>Ver</button>
                      <button className="btn-secondary" style={{ marginLeft: 8 }} onClick={() => openEdit(product)}>Editar</button>
                      <button className="btn-danger" style={{ marginLeft: 8 }} onClick={() => handleDelete(product)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal simple para crear/editar con estilo similar a ProductModal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
            <div className="modal-content">
              <button className="modal-close-btn" onClick={closeModal}>✕</button>
              <div className="modal-header">
                <div className="modal-image-container">
                  <img
                    id="image-preview"
                    src={form.image ? (form.image.startsWith('data:') ? form.image : form.image.startsWith('/') ? form.image : `/src/assets/images/${form.image}`) : '/src/assets/images/placeholder-image.jpg'}
                    alt={form.title || 'Imagen'}
                    className="modal-product-image"
                    onError={(e) => {
                      e.target.src = '/src/assets/images/placeholder-image.jpg';
                      e.target.alt = 'Imagen no disponible';
                    }}
                  />
                </div>
              </div>

              <div className="modal-body">
                <h2 className="modal-product-title">{editingProduct ? 'Editar producto' : 'Agregar producto'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nombre</label>
                    <input name="title" value={form.title} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Imagen (sube un archivo)</label>
                    <input name="imageFile" type="file" accept="image/*" onChange={handleFileChange} />
                    {form.image && (
                      <div style={{ marginTop: 8 }}>
                        <img
                          src={form.image.startsWith('data:') ? form.image : form.image.startsWith('/') ? form.image : `/src/assets/images/${form.image}`}
                          alt="preview"
                          style={{ height: 80, objectFit: 'contain', borderRadius: 6 }}
                          onError={(e) => {
                            e.target.src = '/src/assets/images/placeholder-image.jpg';
                            e.target.alt = 'Vista previa no disponible';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Descripción corta</label>
                    <input name="desc" value={form.desc} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Descripción completa</label>
                    <textarea name="fullDesc" value={form.fullDesc} onChange={handleChange} style={{ height: 36 }} />
                  </div>
                  <div className="form-group">
                    <label>Precio</label>
                    <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input name="stock" value={form.stock} onChange={handleChange} type="number" min="0" required />
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <select name="category" value={form.category} onChange={handleChange} className="form-input">
                      <option value="">Seleccione...</option>
                      <option value="brazilian">Phonk Brasileño</option>
                      <option value="japanese">Phonk Japonés</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="modal-actions" style={{ marginTop: 12 }}>
                    <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
                    <button type="button" className="btn-secondary" onClick={closeModal}>Cancelar</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de vista read-only que reutiliza ProductModal */}
        {viewProduct && (
          <ProductModal product={viewProduct} isOpen={!!viewProduct} onClose={() => setViewProduct(null)} />
        )}
        {/* Confirmación elegante centralizada para eliminar producto */}
        <ConfirmModal
          isOpen={!!pendingDelete}
          title={pendingDelete ? `Eliminar "${pendingDelete.title}"` : 'Eliminar producto'}
          message={pendingDelete ? 'Esta acción no se puede deshacer. ¿Deseas continuar?' : ''}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
};

export default Products;