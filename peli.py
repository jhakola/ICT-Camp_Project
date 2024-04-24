# Function for reading in the input for a given player. The parameter
# will be displayed as the player number. Only an input of 1 or 0 will be 
# accepted, any other input will be invalid and prompt a new input. Returns
# the valid input as an int.
def readInput (playerNum):
    flag=False
    while(flag==False):
        print("Enter the input for player " + str(playerNum))
        try:
            inp = int(input())
            if (inp==1 or inp==0):
                flag=True
            else:
                print("Enter 1 for cooperation, 0 for defect")
        except:
            print("Enter a valid input!")
    return inp

# Calculates the points to be given to the players based on their inputs. 
# Returns the points in an array, where the first cell containts the first 
# player's points and the second cell contains the second player's points.
def calcPoints (in1, in2):
    if ((in1+in2) % 2 == 0):
        return ([in1+1, in2+1])
    else:
        return ([in2*3, in1*3])
      
# Main function, gathers input and calculates points, then displays the points
# from the round.
def main ():
    in1 = readInput (1)
    in2 = readInput (2)
    points = calcPoints(in1, in2)
    print("Player 1 got " + str(points[0]) + " points!")
    print("Player 2 got " + str(points[1]) + " points!")
    
main()

