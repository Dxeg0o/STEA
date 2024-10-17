from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from sklearn.decomposition import PCA

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

@app.route('/api/calculate', methods=['GET', 'POST', 'OPTIONS'])
@cross_origin()
def calculate():
    if request.method == 'POST':
        data = request.get_json()
        # Verificar que los datos sean válidos
        if not data or 'predictions' not in data or not data['predictions']:
            return jsonify({'error': 'Datos inválidos'}), 400

        # Extraer los puntos del JSON
        try:
            points = np.array([[p["x"], p["y"]] for p in data["predictions"][0]["points"]])
        except KeyError:
            return jsonify({'error': 'Formato de datos incorrecto'}), 400

        # --- Tu código de procesamiento permanece igual ---
        # 1. Realizar PCA utilizando scikit-learn
        pca = PCA(n_components=2)
        pca.fit(points)
        principal_components = pca.components_
        mean_point = pca.mean_

        # Direcciones principal y secundaria
        principal_component = principal_components[0]  # Dirección principal
        secondary_component = principal_components[1]  # Dirección secundaria (perpendicular)

        # 2. Proyectar los puntos sobre las componentes principales
        projected = pca.transform(points)

        # 3. Calcular la altura utilizando la proyección sobre la dirección principal
        projected_primary = projected[:, 0]
        min_index = np.argmin(projected_primary)
        max_index = np.argmax(projected_primary)
        point_min = points[min_index]
        point_max = points[max_index]
        altura = np.linalg.norm(point_max - point_min)
        print(f"La altura del espárrago es: {altura}")

        # 4. Dividir el espárrago en segmentos y calcular el ancho máximo
        num_segments = 100  # Puedes ajustar este número para mayor precisión
        min_proj = projected_primary.min()
        max_proj = projected_primary.max()
        segment_length = (max_proj - min_proj) / num_segments

        max_width = 0
        width_indices = None
        for i in range(num_segments):
            # Definir los límites del segmento
            start = min_proj + i * segment_length
            end = start + segment_length

            # Seleccionar los puntos que caen dentro del segmento
            indices = np.where((projected_primary >= start) & (projected_primary < end))[0]
            if len(indices) > 1:
                # Obtener las proyecciones sobre la dirección secundaria
                proj_sec = projected[indices, 1]
                # Calcular el ancho en este segmento
                width = proj_sec.max() - proj_sec.min()
                if width > max_width:
                    max_width = width
                    # Guardar los puntos extremos para visualización si es necesario
                    width_indices = indices[np.argmin(proj_sec)], indices[np.argmax(proj_sec)]

        radio = max_width / 2
        print(f"El radio (ancho máximo / 2) del espárrago es: {radio}")

        # Preparar los resultados para devolver al frontend
        result = {
            'altura': altura,
            'radio': radio
        }

        return jsonify(result)
    elif request.method == 'GET':
        # Opcional: Puedes devolver información sobre el endpoint
        return jsonify({'message': 'Endpoint para cálculos. Utiliza POST para enviar datos.'}), 200
    elif request.method == 'OPTIONS':
        # Flask-CORS maneja automáticamente las solicitudes OPTIONS, pero puedes incluir esto si deseas
        return '', 204
    else:
        return jsonify({'error': 'Método no soportado'}), 405

if __name__ == '__main__':
    app.run(debug=True)
