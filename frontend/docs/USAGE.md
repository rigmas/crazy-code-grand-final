# Preparation

## Prepare mindfile
Mindfile is a marker which define where the 3D model placed

1. Take photo with camera
2. Upload to https://hiukim.github.io/mind-ar-js-doc/tools/compile to generate mindfile
3. Download the mindfile
4. Convert it to base64 with any tools e.g. https://base64.guru/converter/encode/file

## Prepare quest
1. Create quest `POST /api/quests`
2. Update mindfile using previous generated id from step 1 `PUT /api/quests/{id}/mindfile`
