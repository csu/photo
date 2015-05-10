mkdir -p ./500
mogrify -resize "500x500>" -quality 80 -path ./500 *.jpg
mkdir -p ./1500
mogrify -resize "1500x1500>" -quality 80 -path ./1500 *.jpg

cd ./500
for filename in *.jpg*;
do
    inname=`convert $filename -format "%t" info:`
    size=`convert $filename -format "%wx%h" info:`
    mv $filename "${inname}_${size}.png";
done

cd ../1500
for filename in *.jpg*;
do
    inname=`convert $filename -format "%t" info:`
    size=`convert $filename -format "%wx%h" info:`
    mv $filename "${inname}_${size}.png";
done