# Autumn Assignment: A Patchwork Sampler
# 733474
# Autumn Teaching Block 2014

import math
from graphics import * 


def main():
    size, colourList = getInputs()
    win, patchList, patchColourList = drawPatches(size, colourList)
    changeColour(win, size, colourList, patchList, patchColourList)
    
def getInputs():
    size = getSize()
    colourList = getColours()
    return size, colourList #returns user's size, colourlist for later use

def getSize():
    validSize = [5, 7, 9] #valid sizes in a list
    size = 0    #used for the while loop
    print("Please make your choice of common patchwork width & height size, \
this size is the number of patches.")
    print("Available sizes are 5, 7 & 9.")
    while not size in validSize: #loop until the users size choice is valid
        size = input("Enter a common patchwork width & height size: ") 
        if size.isdigit():
            size = int(size)
            if not size in validSize: #checks if users size is not a valid size
                #prints input and a message if size is not a valid size
                print(size, "is an invalid size, please make a valid choice, \
Valid sizes are 5, 7 & 9.")
        else:
            #prints input and a messsage if size is not a digit
            print(size, "is not a valid input, please make a valid choice, \
Valid sizes are 5, 7 & 9.")
        print()
    #prints users size choice when valid size has been inputted
    print("Your choice of patchwork height & width is", size)
    print()
    return size #returns user's size  for later use

def getColours():
    #valid colours in a list
    validColour = ["red", "green", "blue", "yellow", "magenta", "cyan"]
    colourList = [] #starts a list for users colours to be put in
    print("Please make your 4 colour choices. \
Available colours are red, green, blue, yellow, magenta & cyan.")
    #gets user's colour choice via input until there is 4 valid colours inputted
    while len(colourList) < 4:
        colour = input("Enter a valid colour: ")
        colour = colour.lower() #lowers the user input so it matches valid colour
        if not colour in colourList: #checks if user's colour is already in list
            if colour in validColour: #checks if user's colour is a valid colour
                colourList.append(colour) #adds colour to list if valid
                #prints user colour choice if valid
                print("Your colour {0} choice is".format(len(colourList)),colour)
            else:
                #if choice is not a valid colour it prints a message
                print(colour, "is an invalid colour")
        else:
            #if choice is already chosen it prints saying its already chosen
            print("You have already chosen", colour + 
                  ", please choose another colour.")
        print()
    return colourList #returns colourlist for later use
    
def drawPatches(size, colourList):
    size2 = size * 100 #works out window height & width
    win =  GraphWin("Patchwork Sampler", size2, size2)
    win.setBackground("white")
    colourNum = 0 #used to determine each patches colour
    #used to append each patch to be used for the changeColour function
    patchList = []
    #used to append each patches colour to be used for the changeColour function
    patchColourList = []
    for row in range(size):
        y = row * 100 #used to figure out each patches y position
        for column in range(size):
            x = column * 100 #used to figure out each patches x position
            #used to determine each patches colour
            colour = colourList[colourNum]
            patchColourList.append(colour) #appends each patches colour to list
            #used to figure out which patch to draw
            #works out if row is before the last 2 rows and if column is after 1st column
            if row < size - 2 and column > 0:
                patch = drawPatch2(win, x, y, colour)  
            else:
                patch = drawPatch1(win, x, y, colour)
            patchList.append(patch) #appends each patch to list 
            if colourNum == 3: #resets colourNum to 0 if at end of colour sequence
                colourNum = 0
            else: #otherwise adds 1 to colourNum
                colourNum = colourNum + 1
    return win, patchList, patchColourList #returns win for later use 
    #and patchList & patchColourList to be used for the changeColour function
        
def drawPatch1(win, x, y, colour):
    patch = []
    for line in range(10):
        lines1 = Line(Point(100 - line * 10 + x, 100 + y),   
                      Point(x, 100 - (line + 1) * 10 + y))
        lines2 = Line(Point(line * 10 + x, y), 
                      Point(100 + x, (line + 1) * 10 + y))
        lines1.setOutline(colour)
        lines1.draw(win)
        lines2.setOutline(colour)
        lines2.draw(win)
        patch.append(lines1) #each object is appended to patch list
        patch.append(lines2) #each object is appended to patch list
    return patch #returns patch list to be used for the changeColour function

def drawPatch2(win, x, y, colour):
    patch = []
    for row in range(10):
        y1 = row * 10 + y #used to work out y point for top of rectangle
        y2 = 10 * (row + 1) + y #used to work out y point for bottom of rectangle
        for rect in range(4):
            if row % 2 != 0: #works out if row is not even
                rectangle = Rectangle(Point(10 + rect * 30 + x,y1), 
                                      Point(30 * (rect + 1) + x,y2))
                if rect == 3:
                    break
            else: 
                if rect == 0:
                    rectangle = Rectangle(Point(0 + x,y1), 
                                      Point(15 + rect * 30 + x,y2))
                elif rect == 4:
                    rectangle = Rectangle(Point(-5 + rect * 30 + x,y1), 
                                      Point(100 + x,y2))
                else:
                    rectangle = Rectangle(Point(-5 + rect * 30 + x,y1), 
                                      Point(15 + rect * 30 + x,y2))
            rectangle.setFill(colour)
            rectangle.draw(win)
            patch.append(rectangle) #each object is appended to patch list
    return patch #returns patch list to be used for the changeColour function
            
def changeColour(win, size, colourList, patchList, patchColourList):
    #allows user to click a patch to change colour as many times
    while True:
        mouse = win.getMouse()
        mouseX = mouse.getX() // 100 #used to get patch x location
        mouseY = mouse.getY() // 100 #used to get patch y location
        patchNum = 0 #used to give position of patch in patchList
        for row in range(size):
            for column in range(size):
                #locates clicked patch and compares click coords
                #& patch top left coords
                if mouseY == row and mouseX == column:
                    #loops through each object in patch
                    for object in range(len(patchList[patchNum])):
                            #gets patch colour
                            oldColour = patchColourList[patchNum]
                            #finds colour in colourSequence list
                            colourNum = colourList.index(oldColour)
                            #resets index if at end of colour sequence
                            if colourNum == 3:
                                colourNum = 0
                            #otherwise adds 1 to index
                            else:
                                colourNum = colourNum + 1
                            #sets new colour for patch
                            newColour = colourList[colourNum]
                            #recalls patch object
                            obj = patchList[patchNum][object]
                            #sets object to the new colour
                            obj.setFill(newColour)
                    #updates patchColourList to change patch colour to new colour
                    patchColourList[patchNum] = newColour
                patchNum = patchNum + 1

main()