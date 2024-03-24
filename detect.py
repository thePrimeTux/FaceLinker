import cv2
import io
import numpy as np
import face_recognition

def countFaces(path):
    image = face_recognition.load_image_file(path)
    faces = face_recognition.face_locations(image)
    print(len(faces))
    return len(faces)

def detectFaces(ref, tar):
    reference_data = ref.read()
    reference_image = face_recognition.load_image_file(io.BytesIO(reference_data))
    reference_encoding = face_recognition.face_encodings(reference_image)[0]
    
    output = []

    for image_file in tar:
        target_data = image_file.read()
        target_image = face_recognition.load_image_file(io.BytesIO(target_data))

        detected_pos = face_recognition.face_locations(target_image)

        unknown_encoding = []

        for face in detected_pos:
            top, right, bottom, left = face
            face_image = target_image[top:bottom, left:right]

            face_image = cv2.resize(face_image, (256, 256))
            face_embedding = face_recognition.face_encodings(face_image)
            unknown_encoding.append(face_embedding)

        filtered_unknown_list = [encoding for encoding in unknown_encoding if encoding]

        for encoding in filtered_unknown_list:
            encoding = np.array(encoding)
            result =  face_recognition.compare_faces([reference_encoding], encoding)
            if result[0]:
                output.append(image_file)
    # print("Face detected in the following images:")
    # print(output)
    # for path in output:
    #     print(path)
    return output