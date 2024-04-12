import io
import os
import pickle
import numpy as np
import face_recognition

from update_encodings import updateEncodings  

def detectFaces(ref):
    reference_data = ref.read()
    reference_image = face_recognition.load_image_file(io.BytesIO(reference_data))
    faces = face_recognition.face_locations(reference_image)
    if len(faces) != 1:
      return -1
    
    reference_encoding = face_recognition.face_encodings(reference_image)[0]
    updateEncodings()

    output = []
    for encoding_file in os.listdir("./static/encodings/"):
      with open(f'./static/encodings/{encoding_file}', 'rb') as file:
        target = pickle.load(file)
        for encoding in target:
          encoding = np.array(encoding)

          result =  face_recognition.compare_faces([reference_encoding], encoding)
          if result[0]:
            output.append(encoding_file[:-4])
            break

    return output